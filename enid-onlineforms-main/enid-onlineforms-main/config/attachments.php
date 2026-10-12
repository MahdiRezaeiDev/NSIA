<?php

return [
    'disk' => env('ATTACHMENTS_FILESYSTEM_DISK', env('APP_ENV', 'production') === 'local' ? 'local' : 's3'),
];
