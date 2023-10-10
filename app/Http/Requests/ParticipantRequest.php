<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ParticipantRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $commonRules = [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'gender' => 'required',
            'email' => 'email|required',
            'dob' => 'required|date',
            'place_of_birth' => 'required',
            'state_of_origin' => 'required',
            'local_government_area' => 'required',
            'town' => 'required',
            'nigeria_address' => 'required',
            'nigeria_telephone' => 'required',
            'profession' => 'required',
            'passport_number' => 'required',
            'name_of_next_of_kin_in_nigeria' => 'required',
            'address_of_next_of_kin_in_nigeria' => 'required',
            'telephone_of_next_of_kin_in_nigeria' => 'required',
            'date_of_arrival_in_guinea' => 'required',
            'guinea_address' => 'required',
            'guinea_telephone' => 'required',
            'name_of_next_of_kin_in_guinea' => 'required',
            'address_of_next_of_kin_in_guinea' => 'required',
            'telephone_of_next_of_kin_in_guinea' => 'required',
            'issue_date' => 'required',
            'card_expiry_date' => 'required',
            'comments' => '',
            'generate_qr' => '',
        ];
    
        if ($this->isMethod('post')) {
            return array_merge($commonRules, [
                'applicant_picture' => 'required',
                'applicant_signature' => 'required',
                'card_number' => 'required|unique:participants',
            ]);
        }
    
        $id = $this->route('participant');
    
        return array_merge($commonRules, [
            'card_number' => 'required|unique:participants,card_number,' . $id,
            'id' => '',
            'uid' => '',
            'applicant_picture' => '',
            'applicant_signature' => '',
        ]);
    }
}
