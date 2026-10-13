<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddApplicationLookupIndexes extends Migration
{
    private $indexes = [
        ['individualforms', 'nsia_individual_family_lookup', ['family_form_reference_no']],
        ['appointments', 'nsia_appointment_family_lookup', ['family_form_reference_no']],
        ['appointments', 'nsia_appointment_slot_lookup', ['center_id', 'appointment_date', 'start_time', 'end_time']],
    ];

    public function up()
    {
        foreach ($this->indexes as list($table, $name, $columns)) {
            if (!$this->hasIndex($table, $name)) {
                Schema::table($table, function (Blueprint $blueprint) use ($columns, $name) {
                    $blueprint->index($columns, $name);
                });
            }
        }
    }

    public function down()
    {
        foreach (array_reverse($this->indexes) as list($table, $name, $columns)) {
            if ($this->hasIndex($table, $name)) {
                Schema::table($table, function (Blueprint $blueprint) use ($name) {
                    $blueprint->dropIndex($name);
                });
            }
        }
    }

    private function hasIndex($table, $name)
    {
        return DB::table('information_schema.STATISTICS')
            ->where('TABLE_SCHEMA', DB::connection()->getDatabaseName())
            ->where('TABLE_NAME', $table)->where('INDEX_NAME', $name)->exists();
    }
}
