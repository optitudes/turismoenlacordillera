<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ventures', function (Blueprint $table) {
            //atributos de la tabla
            $table->id();
            $table->string("address")->nullable();
            $table->string("name")->unique();

            $table->boolean('isActive');
            $table->boolean('isPublish');

            $table->double('mapLatitude')->nullable();
            $table->double('mapLongitude')->nullable();

            $table->foreignId('userId')->constrained('users');

            //comportamientos de la tabla
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventures');
    }
};
