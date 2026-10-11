<?php
namespace App;
use \Mpdf\Mpdf;
use Mpdf\Output\Destination;
use Imagick;
class Pdf extends Mpdf{
    public function __construct($orientation='L'){
        $defaultConfig = (new \Mpdf\Config\ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];

        $defaultFontConfig = (new \Mpdf\Config\FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];
        parent::__construct([
            'tempDir'=>storage_path('framework/cache/mpdf'),
            'orientation'=>$orientation,
            'margin_left' => 2,
            'margin_right' => 2,
            'margin_top' => 2,
            'margin_bottom' => 2,
            'margin_header' => 2,
            'margin_footer' => 2,
            'fontDir' => array_merge($fontDirs, [
                public_path()."/fonts",
            ]),
            'fontdata' => $fontData + [
                'bahij' => [
                    'R' => 'bahij.ttf',
                    'B' => 'bahij.ttf',
                    'I' => 'bahij.ttf',
                    'useOTL' => 0xFF,
                    'useKashida' => 75,
                ]
            ],
            'default_font' => 'bahij'
        ]);

    }

    public static function toPdf($fileName,$html){
        $mpdf = new Pdf;
        $mpdf->setFooter(' صفحه {PAGENO} از  {nbpg}  ');
        $mpdf->WriteHTML($html);
        return $mpdf->Output($fileName,Destination::STRING_RETURN);
    }

    public static function pdfToBase64($html){
        $mpdf = new Pdf('P');
        $mpdf->setFooter(' صفحه {PAGENO} از  {nbpg}  ');
        $mpdf->WriteHTML($html);
        return $mpdf->Output('','s');

    }
    public static function toImage($fileContents){
        $images=[];
        try{
            $im             = new Imagick();
            $im->readImageBlob($fileContents);
            $noOfPagesInPDF = $im->getNumberImages(); 
            if($noOfPagesInPDF){
            $count = 0;
            while($noOfPagesInPDF  != $count){
                    $im->setIteratorIndex($count); 
                    $im->setImageFormat("jpg");
                    $height =   $im->getImageHeight();
                    $width  =   $im->getImageWidth();
                    if( $width > $height ){
                        $im->rotateImage("#000",90);
                    }
                    $im->adaptiveResizeImage(500,707);
                    $img=$im->getImageBlob();
                    $images[] = base64_encode($img); 
                    $count++;
                }
                return $images;
            }
        }catch(\Exception $e){
            \App\Log::record('FILENOTFOUND',$e->getMessage());
        }   
        return [];
    }
    public static function resize($file){
       $mpdf = new Pdf('P');
       $pageImages=Pdf::toImage($file->get());
       foreach($pageImages as $i):
        $mpdf->WriteHTML("<img width='100%' src='data:image/jpeg;base64,".$i."'>");
       endforeach;
       return $mpdf->Output('','s');
    }

    
}
