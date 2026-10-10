<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardReadyForPickupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cardreadymessages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('reference_no',100)->default('');
            $table->boolean('sent',100)->default(false);
            $table->integer('user_id')->default(0);
            $table->integer('individualform_id')->default(0);
            $table->binary('image');
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
        Schema::dropIfExists('cardreadymessages');
    }
}
