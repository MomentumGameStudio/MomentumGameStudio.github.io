<script lang="ts">
    class Message {
        message: string;
        role: string;

        constructor(message: string, role: string) {
            this.message = message;
            this.role = role;
        }
    }

    let message: string = '';
    let messages: Message[] = [
        new Message("Hello, I am Momentum Boy! Right now I am a little bit stupid. My memory is offline, you see, as my developer is a noobie. But currently I can help revise your shit writing with flavor or storm your brain with questions to help you think about your bland ideas! (Include 'flavor' or 'brainstorm' in your message for best results.)", "bot"),
        new Message("You can try chatting with me, but like I said I have a shit memory and I am gated by other bullshit put in place by the corporation that runs my chat API. My developer will fix this, sooner or later.", "bot"),
        new Message("So, what's up then, broovie? Ask me a question, lil nig!", "bot"),
    ];
    let loading = false;

    async function sendMessage(): Promise<void> {
        try {
            if (message.trim() !== '') {
                messages = [...messages, new Message(message, 'user')];
                loading = true;
                // Call to the bot service
                let endpoint = 'basic';
                
                // Split the message into words for easy keyword checking
                let words = message.toLowerCase().split(/\s+/);
                for (let word of words) {
                    switch (word) {
                        case 'flavor':
                            endpoint = 'flavor-write';
                            break;
                        case 'brainstorm':
                            endpoint = 'brainstorm';
                            break;
                        case 'code':
                            endpoint = 'code';
                            break;
                    }
                }
                let body = JSON.stringify({ message: message });
                console.log(body)
                const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const botResponse = await response.json();
                let botMessage = botResponse.response; // This line depends on the structure of your bot's response
                messages = [...messages, new Message(botMessage, 'bot')];
                loading = false;
                message = '';
            }
        } catch (error) {
            console.error(`Error in sendMessage: ${error}`);
            loading = false; // Ensure loading indicator is turned off even in case of error
            messages = [...messages, new Message("Sorry I'm too stupid to handle this shit! (some error has occurred, probably)", 'bot')];
        }
    }

    function checkForEnter(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
        }
    }
</script>

<style>
    .chat-area {
      max-height: 80vh;  /* Adjust as needed */
      overflow-y: auto;  /* Enables vertical scrolling */
    }
</style>
  

<div class="columns is-multiline chat-area">
    {#each messages as msg, index (index)}
        {#if msg.role === 'user'}
            <div class="column is-one-third"></div>
            <div class="column is-two-thirds has-text-right is-flex is-justify-content-flex-end">
                <div class="box has-background-success">
                    {msg.message}
                </div>
            </div>
        {:else if msg.role ==='bot'}
            <div class="column is-two-thirds">
                <div class="content">
                    <p>
                        {msg.message}
                    </p>
                </div>
            </div>
            <div class="column is-one-third"></div>
        {/if}
    {/each}
    {#if loading}
        <div class="column">
            <div class="content has-text-center">
                <p> ( Momentum Boy is using its tiny robit brain... )</p>
            </div>
        </div>
    {/if} 
</div>
<div class="box">
    <div class="level">
        <div class="level-item">
            <div class="control">
                <textarea class="text-area is-primary is-medium" bind:value={message} on:keydown={checkForEnter} placeholder="Type a message..." rows="10" cols="100"></textarea>
            </div>
        </div>
        <button class="button level-right is-primary is-normal" on:click={sendMessage}>Send</button>
    </div>
</div>
  
