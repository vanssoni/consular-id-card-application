<?php

namespace App\Services;

use App\Models\Participant;
class ParticipantService
{
    public function createUpdate($data): array
    {
        $data['uid'] =  @$data['uid'] ? @$data['uid'] : uniqid('PAR-', true);

        //upload the pictures

        if(@$data['applicant_picture'] && !is_string($data['applicant_picture']) ){
            $applicantPicture = time().'-applicant_pic'.'.'. $data['applicant_picture']->extension();  
            $data['applicant_picture']->move(storage_path('app/public/participants/files/'), $applicantPicture);
            $data['applicant_picture'] = $applicantPicture;
        }elseif(@$data['applicant_picture']){
            unset($data['applicant_picture']);
        }
        if(@$data['applicant_signature'] && !is_string($data['applicant_signature'])){
            $applicantPicture = time().'-applicant_signature'.'.'. $data['applicant_signature']->extension();  
            $data['applicant_signature']->move(storage_path('app/public/participants/files/'), $applicantPicture);
            $data['applicant_signature'] = $applicantPicture;
        }elseif(@$data['applicant_signature']){
            unset($data['applicant_signature']);
        }

        if(@$data['generate_qr']){

            include 'phpqrcode/qrlib.php';
            //generate the qr code
            $qrPath = storage_path('app/public/participants/qr-codes/');
            $qrImage ='qr-code-' . $data['uid'] . '.png';
            $qrImagePath = $qrPath.$qrImage;
            // Create the directory if it doesn't exist
            if (!file_exists($qrPath)) {
                mkdir($qrPath, 0755, true);
            }
            // Create a dummy file (empty file) before generating the QR code
            touch($qrImagePath);
    
            \QRcode::png(env('APP_URL')."/scan-qr?uid=".$data['uid'], $qrImagePath);
            $data['qr_code'] = $qrImage;
        }

        if(isset($data['generate_qr'])){
            unset($data['generate_qr']);
        }
        
        if(@$data['id']){
            $participant = Participant::where('id', $data['id'])->update($data);
        }else{
            $participant = Participant::create($data);
        }
        return [
            'success' => true,
            'message' => 'Participant'.(@$data['id'] ? ' updated' : ' created').' successfully!',
            'data' => $participant,
        ];
    }
}
