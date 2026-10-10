<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIdVerificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('idverifications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('reference_no');
            $table->mediumText('request');
            $table->string('type');
            $table->string('verification_reference_no')->nullable();
            $table->string('name')->nullable();
            $table->string('father_name')->nullable();
            $table->string('grand_father_name')->nullable();
            $table->string('birth_year')->nullable();
            $table->string('province')->nullable();
            $table->string('district')->nullable();
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
        Schema::dropIfExists('idverifications');
    }
}
