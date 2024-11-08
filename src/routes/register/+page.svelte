<script lang="ts">
    import {Register, Section} from "flowbite-svelte-blocks";
    import {enhance} from "$app/forms";
    import {Button, Input, Label, Spinner} from "flowbite-svelte";

    let password = '';
    let passwordError = '';
    let sending = false;

    function validatePassword() {
        if (password.length < 5) {
            passwordError = 'Password must be at least 5 characters long';
            return false;
        }
        passwordError = '';
        return true;
    }

    function handleSubmit(event) {
        if (!validatePassword()) {
            event.preventDefault();
        }
    }
</script>

<Section name="register">
    <Register href="/register">
        <svelte:fragment slot="top">
            <img alt="Srello Logo" class="w-8 h-8 mr-2" src="/srello.svg"/>
            Srello
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form action="?/register" class="flex flex-col space-y-6" method="POST" on:submit={handleSubmit}
                  use:enhance={() => {
                      sending = true;
                      return ({ update }) => {
                            update({ invalidateAll: true }).finally(async () => {sending = false;
                            });
                        };
                  }}>
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create an account</h3>
                <Label class="space-y-2">
                    <span>Your name</span>
                    <Input autocomplete="name" name="name" placeholder="John Appleseed" required type="text"/>
                </Label>
                <Label class="space-y-2">
                    <span>Your email</span>
                    <Input autocomplete="email" name="email" placeholder="name@company.com" required type="email"/>
                </Label>
                <Label class="space-y-2">
                    <span>Your password</span>
                    <Input
                            autocomplete="new-password"
                            bind:value={password}
                            minlength={5}
                            name="password"
                            on:blur={validatePassword}
                            placeholder="•••••"
                            required
                            type="password"
                    />
                    {#if passwordError}
                        <span class="text-red-500 text-sm">{passwordError}</span>
                    {/if}
                </Label>
                <Label class="space-y-2">
                    <span>Confirm password</span>
                    <Input autocomplete="new-password" name="passwordConfirm" placeholder="•••••" required
                           type="password"/>
                </Label>
                {#if sending}
                    <Button type="submit" class="w-full1">
                        <Spinner class="me-3" size="5" color="white"/>
                        Loading ...
                    </Button>
                {:else}
                    <Button type="submit" class="w-full1">Create an account</Button>
                {/if}
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account?
                    <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/login">
                        Login here
                    </a>
                </div>
            </form>
        </div>
    </Register>
</Section>