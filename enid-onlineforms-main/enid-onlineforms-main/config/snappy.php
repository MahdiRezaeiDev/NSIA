<?php

return array(


    'pdf' => array(
        'enabled' => true,
        #'binary'  => '"C:\Program Files (x86)\wkhtmltopdf\bin\wkhtmltopdf"',
        'binary'=>'/usr/bin/xvfb-run -a wkhtmltopdf',
        'timeout' => false,
        'options' => array(),
        'env'     => array(),
    ),
    'image' => array(
        'enabled' => true,
        'binary'=> '/usr/bin/xvfb-run -a wkhtmltoimage',
        'timeout' => false,
        'options' => array(),
        'env'     => array(),
    ),


);
