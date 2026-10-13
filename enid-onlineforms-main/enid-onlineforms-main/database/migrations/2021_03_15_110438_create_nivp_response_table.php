<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNivpResponseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ivpresponses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('reference_no');
            $table->integer('old_status');
            $table->integer('new_status')->nullable();
            $table->integer('user_id');
            $table->mediumText('response');
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
        Schema::dropIfExists('ivpresponses');
    }
}
