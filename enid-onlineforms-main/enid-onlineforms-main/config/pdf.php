<?php

return [
    // Local installations need no cloud credentials; production keeps S3.
    'disk' => env('PDF_FILESYSTEM_DISK', env('APP_ENV', 'production') === 'local' ? 'local' : 's3'),
	'mode'                  => 'utf-8',
	'format'                => 'A4',
	'author'                => '',
	'subject'               => '',
	'keywords'              => '',
	'creator'               => 'Laravel Pdf',
	'display_mode'          => 'fullpage',
	'tempDir'               => storage_path('framework/cache/mpdf'),
	'font_path' => base_path('storage/fonts/'),
	'font_data' => [
		'bahij' => [
			'R'  => 'bahij.ttf',    // regular font
			'useOTL' => 0xFF,    // required for complicated langs like Persian, Arabic and Chinese
			//'useKashida' => 75,  // required for complicated langs like Persian, Arabic and Chinese
		],
		'B Titr' => [
			'R'  => 'BTitrBd.ttf',    // regular font
			'useOTL' => 0xFF,    // required for complicated langs like Persian, Arabic and Chinese
			//'useKashida' => 75,  // required for complicated langs like Persian, Arabic and Chinese
		]
	]
];
