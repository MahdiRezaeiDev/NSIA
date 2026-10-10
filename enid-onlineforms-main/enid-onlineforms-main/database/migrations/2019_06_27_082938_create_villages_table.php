<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVillagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //return true;
        Schema::create('villages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('province_english',100);
            $table->string('district_english',100);
            $table->string('village_english',100);
            $table->string('province',100);
            $table->string('district',100);
            $table->string('village',100);
            $table->timestamps();
            $table->index(['province', 'district','village']);
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
        Schema::dropIfExists('villages');
    }
}
