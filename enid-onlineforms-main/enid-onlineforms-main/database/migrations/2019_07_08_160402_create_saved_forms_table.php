<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSavedFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //return true;
        Schema::create('savedforms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('application_id',20);
            $table->string('dob_day',2);
            $table->string('dob_month',2);
            $table->string('dob_year',4);
            $table->longText('data');
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
        //return true;
        Schema::dropIfExists('savedforms');
    }
}
