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
        Schema::create('microsite_solicitudes', function (Blueprint $table) {
            //atributos
            $table->id();
            $table->text("comment")->nullable();
            $table->enum("status",["PENDIENTE","EN_PROCESO","APROBADO","RECHAZADO"])->nullable();
            //relaciones
            $table->foreignId('adminId')->nullable()->constrained('users');
            $table->foreignId('userId')->nullable()->constrained('users');
            $table->foreignId('ventureId')->constrained('ventures');
            $table->foreignId('micrositeId')->constrained('microsites');
            //comportamientos
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('microsite_solicitudes');
    }
};
