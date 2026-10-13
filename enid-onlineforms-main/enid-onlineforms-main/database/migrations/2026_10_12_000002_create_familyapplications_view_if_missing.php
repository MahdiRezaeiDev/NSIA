<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateFamilyapplicationsViewIfMissing extends Migration
{
    public function up()
    {
        if (\DB::table('information_schema.TABLES')->where('TABLE_SCHEMA', \DB::connection()->getDatabaseName())
            ->where('TABLE_NAME', 'familyapplications')->exists()) {
            return;
        }
        \DB::statement("CREATE VIEW `familyapplications` AS SELECT
            REPLACE(c.name, 'مرکز توزیع تذکره الکترونیکی', '') AS center_name,
            c.id AS center_id, f.reference_no, f.family_form_reference_no, '1' AS total_applicants,
            a.start_time, a.end_time, f.created_at, f.status,
            f.father_name, f.father_surname, f.grand_father_name, f.grand_father_surname,
            f.family_form_reference_no AS reference, f.name, f.surname,
            f.primary_contact_no, f.secondary_contact_no, f.relationship_with_head_of_family,
            f.apply_for_new_id,
            CONCAT(f.current_residence_village, ' ', f.current_residence_district, ' ', f.current_residence_province) AS current_residence,
            CONCAT(f.name, ' ', IFNULL(f.surname, '')) AS head_of_family_name,
            a.queue_no, a.appointment_date, f.opened, f.opened_by, f.opened_by_user_id
            FROM individualforms f
            LEFT JOIN appointments a ON a.family_form_reference_no = f.family_form_reference_no
            LEFT JOIN centers c ON c.id = f.center_id");
    }

    public function down()
    {
        // Do not remove a listing view that may predate this migration.
    }
}
