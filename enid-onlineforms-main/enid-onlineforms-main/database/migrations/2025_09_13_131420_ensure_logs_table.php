<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EnsureLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('logs')) {
            return;
        }
        Schema::create('logs', function (Blueprint $table) {
            $table->bigIncrements('id');         // Primary key
            $table->string('action');            // Action performed
            $table->text('data')->nullable();    // Additional data
            $table->string('ip', 45)->nullable(); // User IP address (supports IPv6)
            $table->unsignedBigInteger('user_id')->nullable(); // ID of the user who performed the action
            $table->timestamps();                // created_at & updated_at

            // Optional: add foreign key constraint if you have a users table
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Preserve existing audit records on rollback.
    }
}
