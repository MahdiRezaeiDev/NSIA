<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Hijri;
class Note extends Model
{
    protected $appends = ['created_on'];



    public function getCreatedOnAttribute(){
        return Hijri::fromCarbon($this->created_at)->format('d/m/Y H:i:s');
    }
}
