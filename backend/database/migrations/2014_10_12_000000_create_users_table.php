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
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string('nom');
            $table->string('postnom');
            $table->string('prenom');
            $table->date('date_de_naissance');
            $table->string('lieu_de_naissance');
            $table->string('metier');
            $table->string('formation_suivie');
            $table->string('competences');
            $table->date('periode_validite');
            $table->string('qrcode_image')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
