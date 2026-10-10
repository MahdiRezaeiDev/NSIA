<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExceptionLog extends Model
{
    protected $fillable=[
        'status','trace','file'
    ];
}
