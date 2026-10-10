<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('surname')->default('')->nullable();
            $table->integer('center_id')->index('center_id');
            $table->string('center_name');
            $table->string('father_name');
            $table->string('father_surname')->default('')->nullable();
            $table->string('grand_father_name');
            $table->string('grand_father_surname')->default('')->nullable();
            $table->string('primary_contact_no')->default('')->nullable();
            $table->string('secondary_contact_no')->default('')->nullable();
            $table->string('reference_no');
            $table->string('description');
            $table->string('status_description')->index('status_description');
            $table->integer('user_id');
            $table->datetime('event_date')->index('event_date');
            $table->string('family_form_reference_no');
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
        Schema::dropIfExists('reports');
    }
}
