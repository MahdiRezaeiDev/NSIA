<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EnsureUsersTable extends Migration
{
    public function up()
    {
        if (Schema::hasTable('users')) {
            if (!Schema::hasColumn('users', 'remember_token')) {
                Schema::table('users', function (Blueprint $table) { $table->rememberToken(); });
            }
            return;
        }
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id'); // <-- changed here
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('role');
            $table->boolean('active')->default(1);
            $table->unsignedBigInteger('center_id')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        // Preserve accounts that may have existed before this compatibility migration.
    }
}
