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
        Schema::create('profiles', function (Blueprint $table) {
            //atributos de la tabla
            $table->id();
            $table->string("address")->nullable();
            $table->string("idNumber");
            $table->string("lastNames");
            $table->string("names");
            $table->bigInteger("phoneNumber")->nullable();
            //hace referencia al prefijo del pais
            $table->string("phonePrefix")->nullable();
            $table->string("pictureUrl")->nullable();

            //relaciones
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
        Schema::dropIfExists('profiles');
    }
};
