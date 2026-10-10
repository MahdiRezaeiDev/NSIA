<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NidPictures extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nidpictures', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('record_id');
            $table->string('file_path');
            $table->string('nid_number');
            $table->integer('user_id');
            $table->integer('signature_id');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nidpictures');
    }
}
