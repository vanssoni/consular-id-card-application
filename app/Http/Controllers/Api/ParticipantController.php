<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Participant;
use App\Http\Requests\ParticipantRequest;
use App\Services\ParticipantService;
class ParticipantController extends Controller
{
    //

    public function index(Request $request){
        
        return response()->json([
            'success' => true,
            'data' => Participant::filter($request->all())->latest()->paginate($request->per_page ?? 10 ),
        ]);
    }

    // create and participant
    public function store(ParticipantRequest $request, ParticipantService $participantService ){
        return response()->json($participantService->createUpdate($request->validated()));
    }

    // create and participant
    public function show($id ){
        $participant = Participant::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $participant,
        ]);
    }


    // update participant
    public function update( ParticipantRequest $request, ParticipantService $participantService, $id ){

        $participant = Participant::findOrFail($id);
        return response()->json($participantService->createUpdate($request->validated()));
    }
}
