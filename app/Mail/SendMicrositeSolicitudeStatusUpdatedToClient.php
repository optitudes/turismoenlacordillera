<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendMicrositeSolicitudeStatusUpdatedToClient extends Mailable
{
    use Queueable, SerializesModels;

    private $solicitudeInfo = [];

    /**
     * Create a new message instance.
     */
    public function __construct($newStatus,$micrositeName,$comment)
    {
        $this->solicitudeInfo = ['newStatus'=>$newStatus,'micrositeName'=>$micrositeName,'comment'=>$comment];
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Cambio de estado de la solicitud de micrositio',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'Mail.MicrositeSolicitude.micrositeSolicitudeStatusUpdatedToClient',
            with: $this->solicitudeInfo
        );
    }
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
