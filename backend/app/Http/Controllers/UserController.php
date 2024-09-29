<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Endroid\QrCode\QrCode; // Importer QrCode
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validation des données
            $validatedData = $request->validate([
                'nom' => 'required|string|max:255',
                'postnom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'date_de_naissance' => 'required|date',
                'lieu_de_naissance' => 'required|string|max:255',
                'metier' => 'required|string|max:255',
                'formation_suivie' => 'required|string|max:255',
                'competences' => 'required|string|max:255',
                'periode_validite' => 'required|date',
            ]);

            // Création d'un nouvel utilisateur
            $user = User::create($validatedData);

            // Génération du code QR
            $qrData = json_encode($validatedData);
            $qrCode = new QrCode($qrData);
            $writer = new PngWriter();

            // Chemin pour l'image QR
            $qrCodePath = 'qrcodes/user_' . $user->id . '.png';
            $fullPath = public_path($qrCodePath);

            // Créer le dossier si nécessaire
            $directory = dirname($fullPath);
            if (!File::exists($directory)) {
                File::makeDirectory($directory, 0755, true);
            }

            // Enregistrement du code QR
            $result = $writer->write($qrCode);
            $qrCodePath = 'qrcodes/user_' . $user->id . '.png';

            // Sauvegarde de l'image QR dans le dossier public
            file_put_contents(public_path($qrCodePath), $result->getString());

            // Mise à jour de l'utilisateur avec le chemin de l'image QR
            $user->qrcode_image = $qrCodePath;
            $user->save();

            // Récupérer l'URL publique du code QR
            $qrCodeUrl = url($qrCodePath);

            return response()->json(['message' => 'Utilisateur créé avec succès!', 'qr_code' => $qrCodeUrl]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur interne du serveur : ' . $e->getMessage()], 500);
        }
    }

    public function getUser()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function user($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }

        // Créer l'URL complète pour l'image QR
        $user->qrcode_image = url($user->qrcode_image);

        return response()->json($user);
    }
}
