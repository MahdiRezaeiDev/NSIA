<?php

namespace App;
use League\Csv\Writer;
use Illuminate\Database\Eloquent\Model;
use App\Log;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Pool;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
class Idverification extends Model
{
    public static $SERVER_PATH ='http://149.54.11.58:5050';
    private $token = null;
    public function setUp(){
        $this->token = Idverification::getToken();
    }
    public static function getToken(){
        try{
            $client = new \GuzzleHttp\Client();
            $response=$client->request('POST',Idverification::$SERVER_PATH.'/users/authenticate',[
                'json'=>[
                    'username'=>env('ID_VERIFICATION_USERNAME'),
                    'password'=>env('ID_VERIFICATION_PASSWORD')
                ]
            ]);
            $res=(string)$response->getBody();
            $res = json_decode($res);
            return $res->token;
        }catch(\Exception $e){
            return false;
        }
    }

    public function verify($reference_no,$type,$name,$father_name,$grand_father_name,$birth_year,$provice_code='',$district_code=''){
        $verificationInfo       =false;
        try{
        $start = \microtime(1);
        $this->client = new \GuzzleHttp\Client(['timeout'=>10]);
        $requestData=[
            'name'=>$name,
            'fname'=>$father_name,
            'gname'=>$grand_father_name,
            'birthYear'=>$birth_year,
            'provincecode'=>$provice_code,
            'district_code'=>$district_code
        ];
        $response=$this->client->request('POST',Idverification::$SERVER_PATH.'/tazkera',[
            'headers' => [
                'Accept'     => 'application/json',
                'Authorization'      => 'Bearer '.$this->token
            ],
            'json'=>$requestData
        ]);
      
      
        
    } catch(\Exception $e){
        Log::record('IdverificationTimeout',['request'=>['reference_no'=>$reference_no,'request'=>$requestData],'response'=>[]]);
        return false;
    }
        return $verificationInfo;

    }

    public static function verifyIndividualForms($limit=false){
        $forms = Idverification::getIndividualForms($limit);
        $v     = new Idverification;
        $v->setUp();
        foreach($forms as $f){
            $verificationInfo = $v->verify($f->reference_no,'individualforms',$f->name,$f->father_name,$f->grand_father_name,$f->birthday_year,'',$f->original_residence_district_code);
        }
    }  
    
    
    public static function buildRequest($client,$token,$name,$father_name,$grand_father_name,$birth_year,$province_code='',$district_code){
            $requestData=[
                'name'=>$name,
                'fname'=>$father_name,
                'gname'=>$grand_father_name,
                'birthYear'=>$birth_year,
                'provincecode'=>$province_code,
                'district_code'=>$district_code
            ];
            
            return $client->postAsync(Idverification::$SERVER_PATH.'/tazkera',[
                'headers'=>[
                    'Content-Type'     => 'application/json',
                    'Authorization'      => 'Bearer '.$token
                ],
                'json'=>$requestData
            ]);
    }

    public static function getIndividualForms($limit = false){
        $selectLast = Idverification::orderBy('id','desc')->first();
        $startFrom  = false;
        if($selectLast){
            $startFrom = $selectLast->reference_no;
            $individualform = \App\Individualform::where('reference_no',$selectLast->reference_no)->first();
            if($individualform){
                $startFrom = $individualform->id;
            }
        }
        $forms = \App\Individualform::where('apply_for_new_id','بلی');
        if($startFrom){
            $forms = $forms->where('id','>',$startFrom);
        }
        if($limit){
            $forms = $forms->take($limit);
        }
        $forms = $forms->get(['reference_no','name','father_name','grand_father_name','birthday_year','original_residence_district_code']);
        return $forms;
    }

    public static function batchVerify($limit = false){
        $forms = Idverification::getIndividualForms($limit);
        $v      = new Idverification;
        $v->setUp();
        $client = new Client(['timeout'=>100]);
        $requests = function() use ($forms,$v,$client) {
            foreach($forms as $f):
                yield function() use ($client, $v,$f) {
                    return Idverification::buildRequest($client,$v->token,$f->name,$f->father_name,$f->grand_father_name,$f->birthday_year,'',$f->original_residence_district_code);
                };
                
            endforeach;
        };
        echo 'GOT total forms '.count($forms);
        $pool = new Pool($client, $requests(), [
            'concurrency' => 30,
            'fulfilled' => function (Response $response, $index) use($forms) {
                // this is delivered each successful response
                echo 'FORM INDEX'.$index."\\n";
                $form = $forms[$index];
                Idverification::handleResponse($response,$form);
            },
            'rejected' => function (RequestException $reason, $index) {
                // this is delivered each failed request
                echo $reason->getMessage();
            },
        ]);
        
        // Initiate the transfers and create a promise
        $promise = $pool->promise();
        
        // Force the pool of requests to complete.
        $promise->wait();
        
    }

    public static function handleResponse($response,$form){
        $res = $response->getBody()->getContents();
        $res                    = json_decode($res);
        $v = new Idverification;
        $v->reference_no        = $form->reference_no;
        $v->type                = 'individualform';
        $v->response_time       = 0;
        $v->request             = json_encode([]);

       
        if(isset($res->data->list) && count($res->data->list) == 1 ){
           
            $verificationInfo=$res->data->list[0];
            $v->verification_reference_no   = $verificationInfo->key;
            $v->name                        = $verificationInfo->name;
            $v->father_name                 = $verificationInfo->fatherName;
            $v->grand_father_name           = $verificationInfo->grandFatherName;
            $v->birth_year                  = $verificationInfo->birthYear;
            $v->province                    = $verificationInfo->province;
            $v->district                    = $verificationInfo->district;
            if(isset($res->data->list) && count($res->data->list) > 1 ){
                Log::record('IdverificationMoreThanOne',['request'=>['reference_no'=>$form->reference_no],'response'=>$res]);
            }
           
        }
      

        $v->save();
    }
    
    public static function export(){
        $items = Idverification::take(10)->get();
        $records=[];
        foreach($items as $i):
            $request=json_decode($i->request);
            $records[]=[
                'id'=>$i->id,
                'reference_no'=>$i->reference_no,
                'name'=>$request->name,
                'fname'=>$request->fname,
                'gname'=>$request->gname,
                'birthYear'=>$request->birthYear,
                'provincecode'=>$request->provincecode,
                'district_code'=>$request->district_code,
                'verification_reference_no'=>$i->verification_reference_no,
            
            ];
        endforeach;
        
        return $records;
    }
    public static function exportToCsv(){
        $items = Idverification::export();
        $header = array_keys($items[0]);
        $records=[];
        foreach($items as $i):
            $records[]=[
                $i['id'],    
                $i['reference_no'],    
                $i['name'],    
                $i['fname'],    
                $i['gname'],    
                $i['birthYear'],    
                $i['provincecode'],    
                $i['district_code'],    
                $i['verification_reference_no'],    
            ];
        endforeach;
        //load the CSV document from a string
        $csv = Writer::createFromString('');

        //insert the header
        $csv->insertOne($header);

        //insert all the records
        $csv->insertAll($records);

        \Storage::disk('local')->put('report.csv',$csv->getContent());
    }
}
