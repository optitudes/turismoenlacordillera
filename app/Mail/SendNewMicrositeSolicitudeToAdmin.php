<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendNewMicrositeSolicitudeToAdmin extends Mailable
{
    use Queueable, SerializesModels;

    private $solicitudeInfo = [];

    /**
     * Create a new message instance.
     */
    public function __construct($userNames,$micrositeName,$ventureName)
    {
        $this->solicitudeInfo = ['userName'=>$userNames,'micrositeName'=>$micrositeName,'ventureName'=>$ventureName];
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Solicitud de micrositio',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'Mail.MicrositeSolicitude.newMicrositeSolicitudeToAdmin',
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
