<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIvpTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ivpqueues', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('family_form_reference_no');
            $table->integer('center_id');
            $table->datetime('application_date');
            $table->text('request');
            $table->text('response');
            $table->boolean('is_sent')->default(0);
            $table->boolean('tried')->default(0);
            $table->boolean('cancelled')->default(0);
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
        Schema::dropIfExists('ivpqueues');
    }
}
