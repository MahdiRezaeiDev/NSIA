    <head>
        <style>
            @font-face {
                font-family: 'bahij';
                src: url("{{asset('fonts//bahij.ttf')}}") format('truetype')
            }

            body {
                font-family: 'bahij';
                color: black;
                font-size: 60% !important;

            }

            .required_field {
                color: red;
                font-size: 150%;
            }


            td {
                font-size: 60%;

            }

            .vertical-text {
                -webkit-transform: rotate(90deg);
                -webkit-backface-visibility: hidden;
                transform-origin: 0;
                margin: 0px;
                padding: 0px;
                font-size: 60%;

            }

            .customValue {
                padding-right: 20px;
                font-size: 14px;
                color: black;
            }

            @media print {
                .new-page {
                    page-break-before: always;
                }
            }

        </style>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>

    <body dir="rtl">
         
            @foreach($review->attachmentsToBase64() as $img)
            <div>
                <img src="data:image/jpg;base64,{{$img}}">
            </div>
           
            @endforeach
    </body>
</html>
