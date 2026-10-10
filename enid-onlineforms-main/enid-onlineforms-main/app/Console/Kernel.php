<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule; use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Jobs\SendApplicationDetailsToIVP;
class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        /*
        $schedule->call(function () {
            $ids=[];
            $token = \App\Individualform::getIvpToken();
            $centers=\App\Center::getOverseasCenterIds();
            $individualforms = \App\Individualform::where('apply_for_new_id','بلی')->whereIn('center_id',$centers)->where('status',0)->orderBy('id','desc')->where('isSendToIVP',false)->where('tried_ivp',false)->groupBy('family_form_reference_no')->take(300)->get();
            foreach($individualforms as $i):
               if(!in_array($i->id,$ids)){
                $i->sendInfoToIVP($token);
                $ids[]=$i->id;
               }
               
            endforeach;
        })->everyFiveMinutes();
        //Send Rejected applications
        $schedule->call(function () {
            $ids=[];
            $token = \App\Individualform::getIvpToken();
            $centers=\App\Center::getOverseasCenterIds();
            $individualforms = \App\Individualform::where('apply_for_new_id','بلی')->whereNotIn('center_id',$centers)->where('status',3)->where('updated_at','>','2021-01-25 00:00:00')->where('isSendToIVP',false)
            ->groupBy('family_form_reference_no')
            ->take(300)->get()
            ->filter(function($i){
                return $i->isAllMembersProcessed();
            });
            foreach($individualforms as $i):
               if(!in_array($i->id,$ids)){
                $i->sendInfoToIVP($token,false,1);
                $ids[]=$i->id;
            }
               
            endforeach;
        })->hourly();
*/
        $schedule->call(function () {
            \App\IvpQueue::syncQueue(60);
        })->everyMinute();
        $schedule->call(function () {
            \App\IvpQueue::updateQueue();
            /*
            $ids=[];
            $token = \App\Individualform::getIvpToken();
            $centers=\App\Center::getOverseasCenterIds();
            $individualforms = \App\Individualform::where('apply_for_new_id','بلی')->whereNotIn('center_id',$centers)->where('status',0)->where('isSendToIVP',false)->where('tried_ivp',false)->groupBy('family_form_reference_no')->get()->filter(function($i){return $i->isAllMembersNew();});
            $individualforms = $individualforms->chunk(300);
            foreach($individualforms as $forms):
               $schedule->job( new SendApplicationDetailsToIVP($forms) );
            endforeach;
            */
        })->hourly();

        $schedule->call(function () {
           $token =\App\Individualform::getIvpToken();
           $forms = \App\Individualform::where('apply_for_new_id','بلی')->whereIn('status',[6,13])->where('isSendToIvp',true)->take(300)->groupBy('family_form_reference_no')->get();
            foreach($forms as $f):
                if($f->status == 6){
                    $f->cancelFamilyApplicationInIvp($token,'ARD');
                }else{
                    $f->cancelFamilyApplicationInIvp($token,'INC');
                }
              
            endforeach;
        })->everyFiveMinutes();


        $schedule->call(function () {
          $futureDate = \Carbon\Carbon::now()->subMinutes(20)->format('Y-m-d H:i:s');
          $individualforms=\App\Individualform::where('opened',true)->where('updated_at','<',$futureDate)->update([
            'opened'=>false,
            'opened_by'=>'',
            'opened_by_user_id'=>0  
          ]);
         })->everyFiveMinutes();
        /*
        $schedule->call(function () {
            $start=\Carbon\Carbon::now();
            $events = \DB::select(\DB::raw('select description,reference_no,eventDate as created_at from generalreports  where apply_for_new_id="بلی" and reference_no not in (select reference_no from reports) limit 20000'));
            \App\Report::importFromEvents($events);
            $finished=\Carbon\Carbon::now();
            \App\Log::record('ReportsUpdated',['time'=>$finished->diffInSeconds($start),'total'=>count($events)]);
        })->hourly()->timezone('Asia/Kabul')->between('23:00', '06:00'); 
        */
    
  }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
