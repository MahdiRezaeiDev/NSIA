<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCentersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       // return true;
        Schema::create('centers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name',100);
            $table->string('currency',100);
            $table->string('village',100);
            $table->string('town',100);
            $table->string('province',100);
            $table->string('country',100);
            $table->integer('number_of_days_before_appointment')->default(1);
            $table->boolean('enable_appointments')->default(false);
            $table->date('latest_appointment')->nullable();
            $table->longText('appointments');
            $table->decimal('fee',10,2)->default(0);
            $table->decimal('lat',15,14)->default(0);
            $table->decimal('lng',15,14)->default(0);
            $table->string('ip',100)->default(0);
            $table->boolean('status')->default(true);
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
        Schema::dropIfExists('centers');
    }
}
