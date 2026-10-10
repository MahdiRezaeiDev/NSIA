<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVipApplicationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vipapplications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('family_form_reference_no');
            $table->string('old_appointment_date');
            $table->string('new_appointment_date');
            $table->string('queue_no');
            $table->integer('user_id');
            $table->integer('center_id');
            $table->mediumText('request')->nullable();
            $table->mediumText('response')->nullable();
            $table->boolean('is_sent')->default(false);
            $table->boolean('tried')->default(false);
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
        Schema::dropIfExists('vipapplications');
    }
}
