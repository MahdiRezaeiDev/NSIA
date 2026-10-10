{{ \Hijri::fromCarbon( $application->created_at)->format('H:i:s d-m-Y')}} <br>
<img src="data:image/png;base64, {{\Barcode::getBarcodePNG($application->reference_no, "C39",3,33)}}"  alt="barcode" /> <br>
                            {{$application->reference_no}}