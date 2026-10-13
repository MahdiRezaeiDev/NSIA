<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EnsureResponseTimeOnLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('logs', 'response_time')) {
            return;
        }
        Schema::table('logs', function (Blueprint $table) {
            $table->decimal('response_time', 8, 4)->default(0)->after('data');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // A previous migration may own this column; retain its historical data.
    }
}
