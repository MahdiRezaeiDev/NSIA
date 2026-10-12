<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PrepareBackendTestDatabase extends Command
{
    protected $signature = 'backend:prepare-test-database {--database=nsia_test_backend}';
    protected $description = 'Copy schema and center reference data into an isolated regression database; no applicants or accounts are copied';

    public function handle()
    {
        if (!app()->environment(['local', 'testing'])) {
            $this->error('This command is available only in local/testing.');
            return 1;
        }
        $source = config('database.connections.mysql.database');
        $target = $this->option('database');
        if (!preg_match('/^nsia_test_[a-zA-Z0-9_]+$/', $target) || !preg_match('/^[a-zA-Z0-9_]+$/', $source) || $target === $source) {
            $this->error('Use a separate nsia_test_* database.');
            return 1;
        }
        \DB::statement("CREATE DATABASE IF NOT EXISTS `$target` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        foreach (\DB::select("SHOW FULL TABLES FROM `$source` WHERE Table_type='BASE TABLE'") as $row) {
            $table = array_values((array) $row)[0];
            if (!preg_match('/^[a-zA-Z0-9_]+$/', $table)) {
                throw new \RuntimeException('Unexpected table identifier.');
            }
            \DB::statement("CREATE TABLE IF NOT EXISTS `$target`.`$table` LIKE `$source`.`$table`");
        }
        foreach (['centers', 'villages', 'templates'] as $table) {
            if (!\DB::table($target.'.'.$table)->exists()) {
                \DB::statement("INSERT INTO `$target`.`$table` SELECT * FROM `$source`.`$table`");
            }
        }
        $definition = (array) \DB::select("SHOW CREATE VIEW `$source`.`familyapplications`")[0];
        $view = str_replace('`'.$source.'`.', '`'.$target.'`.', $definition['Create View']);
        $view = preg_replace('/VIEW (?:`[^`]+`\.)?`familyapplications`/', 'VIEW `'.$target.'`.`familyapplications`', $view, 1);
        $view = preg_replace('/^CREATE /', 'CREATE OR REPLACE ', $view, 1);
        try {
            config(['database.connections.mysql.database' => $target]);
            \DB::purge('mysql');
            \Schema::clearResolvedInstance('db.schema');
            app()->forgetInstance('db.schema');
            \DB::statement($view);
            $migration = database_path('migrations/2026_10_12_000001_add_ivp_attempt_flag_to_individualforms.php');
            require_once $migration;
            (new \AddIvpAttemptFlagToIndividualforms)->up();
        } finally {
            config(['database.connections.mysql.database' => $source]);
            \DB::purge('mysql');
            \Schema::clearResolvedInstance('db.schema');
            app()->forgetInstance('db.schema');
        }
        $this->info('Prepared '.$target.'; applicant and account data were not copied.');
        return 0;
    }
}
