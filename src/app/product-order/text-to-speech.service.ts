import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  private apiUrl = 'https://api.voicerss.org/';
  private apiKey = '7064088d71ed4555bd5e7fb620cff0d5';

  async getSpeech(text: string): Promise<Blob> {
    const params = new URLSearchParams({
      key: this.apiKey,
      hl: 'en-us',
      src: text,
      c: 'mp3',  // Specify the codec
      f: '44khz_16bit_stereo',  // Specify the format
    });

    const urlWithParams = `${this.apiUrl}?${params.toString()}`;

    try {
      const response = await fetch(urlWithParams);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Failed to fetch speech:', error);
      throw error;
    }
  }
}
