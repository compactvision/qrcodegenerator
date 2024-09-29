<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'postnom',
        'prenom',
        'date_de_naissance',
        'lieu_de_naissance',
        'metier',
        'formation_suivie',
        'competences',
        'periode_validite',
        'qrcode_image',
    ];



    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_de_naissance' => 'date',
    ];

    protected $dates = ['created_at', 'updated_at', 'periode_validite'];
}
