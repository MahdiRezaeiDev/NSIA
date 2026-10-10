<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Center;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Center::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'village' => $faker->name,
        'town' => $faker->name,
        'province' => $faker->name,

    ];
});
