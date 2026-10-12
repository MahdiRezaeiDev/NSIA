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
    }

    public function down()
    {
        // Existing deployments may already own this column; keep their data on rollback.
    }
}
