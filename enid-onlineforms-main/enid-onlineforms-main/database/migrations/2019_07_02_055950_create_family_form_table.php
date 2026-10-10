<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFamilyFormTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('familyforms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('session_id',100)->default('');
            $table->string('reference_no',100);
            $table->string('head_of_family_name',100);
            $table->string('head_of_family_surname',100);
            $table->string('fathername',100);
            $table->string('father_surname',100)->nullable();
            $table->string('grand_father_name',100)->nullable();
            $table->string('grand_father_surname',100)->nullable();
            $table->string('marital_status',50)->nullable();
            $table->string('dob_day',5)->nullable();
            $table->string('dob_month',5)->nullable();
            $table->string('dob_year',5)->nullable();
            $table->string('gender',20)->nullable();
            $table->string('martial_status',50)->nullable();
            $table->string('partner_name',100)->nullable();
            $table->string('partner_surname',100)->nullable();
            $table->string('original_residence_village',100)->nullable();
            $table->string('original_residence_district',100)->nullable();
            $table->string('original_residence_district_code',10)->nullable();
            $table->string('original_residence_province',100)->nullable();

            $table->string('current_residence_village',100)->nullable();
            $table->string('current_residence_district',100)->nullable();
            $table->string('current_residence_district_code',10)->nullable();
            $table->string('current_residence_province',100)->nullable();

            $table->string('head_id_digital_id_no',20)->nullable();
            $table->string('head_of_family_has_id',20)->nullable();
            $table->string('head_of_family_id_type',20)->nullable();

            $table->string('head_id_volume',20)->nullable();
            $table->string('head_id_page',20)->nullable();
            $table->string('head_id_registration',20)->nullable();
            $table->string('head_id_sokok',20)->nullable();

            $table->string('head_id_issue_province',100)->nullable();
            $table->string('head_id_issue_district',100)->nullable();
            $table->string('head_id_issue_district_code',10)->nullable();

            $table->string('head_id_issue_date_day',5)->nullable();
            $table->string('head_id_issue_date_month',5)->nullable();
            $table->string('head_id_issue_date_year',5)->nullable();
            
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
        Schema::dropIfExists('familyforms');
    }
}
