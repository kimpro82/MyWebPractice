// Web Speech API Practice
// Author: kimpro82
// Date: 2024.11.14

/**
 * TextToSpeech class for converting text to speech using Web Speech API
 */
class TextToSpeech {
    private synth: SpeechSynthesis;
    private utterance: SpeechSynthesisUtterance;

    /**
     * Initializes the TextToSpeech instance
     */
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = new SpeechSynthesisUtterance();
    }

    /**
     * Converts the given text to speech
     * @param text - The text to be spoken
     */
    speak(text: string): void {
        // Check if speech is already in progress
        if (this.synth.speaking) {
            console.error('Speech is already in progress.');
            return;
        }

        // Configure the utterance
        this.utterance.text = text;
        this.utterance.lang = 'ko-KR';  // Set language to Korean
        this.utterance.rate = 1;        // Set speech rate (1 is normal speed)
        this.utterance.pitch = 1;       // Set pitch (1 is normal pitch)

        // Start speaking
        this.synth.speak(this.utterance);
    }
}

// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const textInput = document.getElementById('textInput') as HTMLInputElement;
    const speakButton = document.getElementById('speakButton') as HTMLButtonElement;

    // Create an instance of TextToSpeech
    const tts = new TextToSpeech();

    // Add click event listener to the speak button
    speakButton.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (text) {
            tts.speak(text);  // Speak the input text
        } else {
            alert('Please enter some text.');  // Alert if no text is entered
        }
    });
});
