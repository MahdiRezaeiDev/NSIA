<?php
namespace App;
class HijriMonth{
        public static function getMonthName($month){
            $monthName="";
            switch ($month) {
                case 1:
                    $monthName="حمل";
                    break;
                case 2:
                    $monthName="ثور";
                    break;
                case 3:
                    $monthName="جوزا";
                    break;
                case 4:
                    $monthName="سرطان";
                    break;
                case 5:
                    $monthName="اسد";
                    break;
                case 6:
                    $monthName="سنبله";
                    break;
                case 7:
                    $monthName="میزان";
                    break;
                case 8:
                    $monthName="عقرب";
                    break;
                case 9:
                    $monthName="قوس";
                    break;
                case 10:
                    $monthName="جدی";
                    break;
                case 11:
                    $monthName="دلو";
                    break;
                case 12:
                    $monthName="حوت";
                    break;
                default:
                    # code...
                    break;
            }

            return $monthName;
        }
}