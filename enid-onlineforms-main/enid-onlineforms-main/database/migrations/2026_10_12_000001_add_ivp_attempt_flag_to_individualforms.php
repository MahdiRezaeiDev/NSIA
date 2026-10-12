<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIvpAttemptFlagToIndividualforms extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('individualforms', 'tried_ivp')) {
            Schema::table('individualforms', function (Blueprint $table) {
                $table->boolean('tried_ivp')->default(false);
            });
        }
        if (!Schema::hasTable('cancelledforms')) {
            \DB::statement('CREATE TABLE `cancelledforms` LIKE `individualforms`');
            // An archive may contain several historical versions of one reference.
            foreach (\DB::select('SHOW INDEX FROM `cancelledforms`') as $index) {
                if (!$index->Non_unique && $index->Key_name !== 'PRIMARY' && preg_match('/^[a-zA-Z0-9_]+$/', $index->Key_name)) {
                    $names[$index->Key_name] = true;
                }
            }
            foreach (array_keys($names ?? []) as $name) {
                \DB::statement('ALTER TABLE `cancelledforms` DROP INDEX `'.$name.'`');
            }
        }
        if (!Schema::hasColumn('cancelledforms', 'tried_ivp')) {
            Schema::table('cancelledforms', function (Blueprint $table) {
                $table->boolean('tried_ivp')->default(false);
            });
        }
    }

    public function down()
    {
        // Existing deployments may already own this column; keep their data on rollback.
    }
}
