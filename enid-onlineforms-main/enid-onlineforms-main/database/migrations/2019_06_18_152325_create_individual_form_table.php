<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIndividualFormTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('individualforms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('family_form_reference_no',20)->default('');
            $table->string('reference_no',30)->default('')->nullable();
            $table->string('verification_reference_no',30)->default('')->nullable();
            $table->string('rm_id',100)->default('')->nullable();
            $table->string('status',50)->default('0');
            $table->integer('center_id')->default(0);

            $table->string('name',80)->nullable()->default('');
            $table->string('english_name',30)->nullable()->default('');
            $table->string('english_surname',30)->nullable()->default('');
            $table->string('surname',80)->nullable()->default('');
            $table->string('father_name',80)->nullable()->default('');
            $table->string('father_surname',80)->nullable()->default('');
            $table->string('grand_father_name',80);
            $table->string('grand_father_surname',80)->nullable()->default('');
            $table->string('mother_name',80)->nullable()->default('');
            $table->string('partner_name',80)->nullable()->default('');
            $table->string('birthday_day',5)->nullable()->default(0);
            $table->string('birthday_month',5)->nullable()->default(0);;
            $table->string('birthday_year',5)->nullable()->default(0);;
            $table->boolean('military_service')->nullable()->default(false);
            $table->string('military_entry_date_day',2)->nullable()->default(false);
            $table->string('military_entry_date_month',2)->nullable()->default(false);
            $table->string('military_entry_date_year',4)->nullable()->default(false);
            $table->string('military_exit_date_day',2)->nullable()->default(false);
            $table->string('military_exit_date_month',2)->nullable()->default(false);
            $table->string('military_exit_date_year',4)->nullable()->default(false);
            $table->string('military_certificate_no',100)->nullable()->default(false);
            $table->string('military_unit',100)->nullable()->default(false);
            $table->string('local_language_knowledge',200)->nullable()->default(false);
            $table->string('foreign_language_knowledge',200)->nullable()->default(false);
            $table->boolean('is_educated')->nullable()->default(false);
            $table->string('education_level',60)->nullable()->default('بیسواد');
            $table->string('original_residence_village',80)->nullable()->default('');
            $table->string('original_residence_district',80)->nullable()->default('');
            $table->string('original_residence_district_code',10)->nullable()->default('');
            $table->string('original_residence_province',80)->nullable()->default('');
            $table->string('current_residence_village',80)->nullable()->default('');
            $table->string('current_residence_district',80)->nullable()->default('');
            $table->string('current_residence_district_code',10)->nullable()->default('');
            $table->string('current_residence_province',80)->nullable()->default('');
            $table->string('current_residence_country',80)->nullable()->default('');
            $table->string('primary_contact_no',20)->nullable()->default('');
            $table->string('secondary_contact_no',20)->nullable()->default('');
            $table->string('email_address',80)->nullable()->default('');
            $table->string('mother_tongue',120)->nullable()->default('');
            $table->string('marital_status',120)->nullable()->default('');
            $table->string('birth_country',120)->nullable()->default('');
            $table->string('birth_province',120)->nullable()->default('');
            $table->string('birth_district',120)->nullable()->default('');
            $table->string('local_languages_knowledge',100)->nullable()->default('');
            $table->string('foreign_languages_knowledge',100)->nullable()->default('');
            $table->enum('blood_group',[
                'نا معلوم',
                'A+',
                'A-',
                'B+',
                'B-',
                'AB+',
                'AB-',
                'O+',
                'O-',
            ])->default('نا معلوم')->nullable();
            $table->string('kochi_spring_residence_village',80)->nullable()->default('');
            $table->string('kochi_spring_residence_district',80)->nullable()->default('');
            $table->string('kochi_spring_residence_district_code',10)->nullable()->default('');
            $table->string('kochi_spring_residence_province',80)->nullable()->default('');
            $table->string('kochi_winter_residence_village',80)->nullable()->default('');
            $table->string('kochi_winter_residence_district',80)->nullable()->default('');
            $table->string('kochi_winter_residence_district_code',10)->nullable()->default('');
            $table->string('kochi_winter_residence_province',80)->nullable()->default('');
            $table->string('disability_type',10)->nullable()->default('');
            $table->string('ethnicity',50)->nullable()->default('');
            $table->string('religion',20)->nullable()->default('');
            $table->string('religion_sector',50)->nullable()->default('');
            $table->string('occupation',50)->nullable()->default('');
            $table->string('gender',20)->nullable()->default('');
            $table->boolean('has_second_citizenship')->default(false);
            $table->string('second_citizenship_country',80)->default('');
            $table->boolean('is_kochi')->nullable()->default(false);
            $table->string('voting_place',100)->nullable()->default('');
            $table->string('identification_type',30)->nullable()->default('');
            $table->string('paper_id_year',30)->nullable()->default('');
            $table->string('paper_id_volume',30)->nullable()->default('');
            $table->string('paper_id_page',30)->nullable()->default('');
            $table->string('paper_id_registration',30)->nullable()->default('');
            $table->string('paper_id_sokok',30)->nullable()->default('');
            $table->string('digital_id_number',30)->nullable()->default('');
            $table->string('paper_id_copy',200)->nullable()->default('');
            $table->string('id_issue_province',100)->nullable()->default('');
            $table->string('id_issue_district',100)->nullable()->default('');
            $table->string('id_issue_district_code',10)->nullable()->default('');
            $table->string('living_status',100)->nullable()->default('');
            $table->string('id_issue_date_day',5)->nullable()->default(0);
            $table->string('id_issue_date_month',5)->nullable()->default(0);
            $table->string('id_issue_date_year',5)->nullable()->default(0);
            $table->string('apply_for_new_id',30)->nullable()->default(0);
            $table->string('relationship_with_head_of_family',100)->nullable()->default('');
            $table->mediumText('attachments')->nullable();
            
            $table->string('first_gurantor_name',100)->nullable()->default('');
            $table->string('first_gurantor_surname',100)->nullable()->default('');
            $table->string('first_gurantor_father_name',100)->nullable()->default('');
            $table->string('first_gurantor_father_surname',100)->nullable()->default('');
            $table->string('first_gurantor_identity_type',50)->nullable()->default('');
            $table->string('first_gurantor_paper_id_year',100)->nullable()->default('');
            $table->string('first_gurantor_paper_id_volume',100)->nullable()->default('');
            $table->string('first_gurantor_paper_id_page',100)->nullable()->default('');
            $table->string('first_gurantor_paper_id_registration',100)->nullable()->default('');
            $table->string('first_gurantor_paper_id_sokok',100)->nullable()->default('');
            $table->string('first_gurantor_digital_id',100)->nullable()->default('');
            $table->string('first_gurantor_id_issue_province',100)->nullable()->default('');
            $table->string('first_gurantor_id_issue_district',100)->nullable()->default('');
            $table->string('first_gurantor_id_issue_district_code',10)->nullable()->default('');
            $table->string('first_gurantor_id_issue_date_day',5)->nullable();
            $table->string('first_gurantor_id_issue_date_month',5)->nullable();
            $table->string('first_gurantor_id_issue_date_year',5)->nullable();
            $table->string('first_gurantor_dob_day',5)->nullable();
            $table->string('first_gurantor_dob_month',5)->nullable();
            $table->string('first_gurantor_dob_year',5)->nullable();
            $table->string('first_gurantor_gender',20)->nullable()->default('');
            $table->string('first_gurantor_contact_no',40)->nullable()->default('');


            $table->string('second_gurantor_name',100)->nullable()->default('');
            $table->string('second_gurantor_surname',100)->nullable()->default('');
            $table->string('second_gurantor_father_name',100)->nullable()->default('');
            $table->string('second_gurantor_father_surname',100)->nullable()->default('');
            $table->string('second_gurantor_identity_type',50)->nullable()->default('');
            $table->string('second_gurantor_paper_id_year',100)->nullable()->default('');
            $table->string('second_gurantor_paper_id_volume',100)->nullable()->default('');
            $table->string('second_gurantor_paper_id_page',100)->nullable()->default('');
            $table->string('second_gurantor_paper_id_registration',100)->nullable()->default('');
            $table->string('second_gurantor_paper_id_sokok',100)->nullable()->default('');
            $table->string('second_gurantor_digital_id',100)->nullable()->default('');
            $table->string('second_gurantor_id_issue_province',100)->nullable()->default('');
            $table->string('second_gurantor_id_issue_district',100)->nullable()->default('');
            $table->string('second_gurantor_id_issue_district_code',10)->nullable()->default('');
            $table->string('second_gurantor_id_issue_date_day',5)->nullable();
            $table->string('second_gurantor_id_issue_date_month',5)->nullable();
            $table->string('second_gurantor_id_issue_date_year',5)->nullable();
            $table->string('second_gurantor_dob_day',5)->nullable();
            $table->string('second_gurantor_dob_month',5)->nullable();
            $table->string('second_gurantor_dob_year',5)->nullable();
            $table->string('second_gurantor_gender',20)->nullable()->default('');
            $table->string('second_gurantor_contact_no',40)->nullable()->default('');
            $table->boolean('opened')->default(false);
            $table->string('opened_by')->nullable()->default('');
            $table->integer('opened_by_user_id')->nullable()->default(0);
            $table->boolean('isSendToIvp')->default(false);
           
            $table->timestamps();
            $table->index(['reference_no', 'name','surname','english_name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    
        Schema::dropIfExists('individualforms');
    }
}
