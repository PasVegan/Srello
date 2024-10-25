<script lang="ts">
    import {Section, Register} from "flowbite-svelte-blocks";
    import {Button, Label, Input} from "flowbite-svelte";
</script>

<Section name="register">
    <Register href="/register">
        <svelte:fragment slot="top">
            <img class="w-8 h-8 mr-2" src="/srello.svg" alt="Srello Logo"/>
            Srello
        </svelte:fragment>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" action="?/register" method="POST">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create an account</h3>
                <Label class="space-y-2">
                    <span>Your name</span>
                    <Input type="text" name="name" placeholder="John Appleseed" required/>
                </Label>
                <Label class="space-y-2">
                    <span>Your email</span>
                    <Input type="email" name="email" placeholder="name@company.com" required/>
                </Label>
                <Label class="space-y-2">
                    <span>Your password</span>
                    <Input type="password" name="password" placeholder="•••••" required/>
                </Label>
                <Label class="space-y-2">
                    <span>Confirm password</span>
                    <Input type="password" name="passwordConfirm" placeholder="•••••" required/>
                </Label>
                <Button type="submit" class="w-full1">Create an account</Button>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account?
                    <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Login here
                    </a>
                </div>
            </form>
        </div>
    </Register>
</Section>