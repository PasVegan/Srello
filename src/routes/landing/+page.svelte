<script>
    import Section from 'flowbite-svelte-blocks/Section.svelte';
    import HeroHeader from 'flowbite-svelte-blocks/HeroHeader.svelte';
    import FeatureDefault from 'flowbite-svelte-blocks/FeatureDefault.svelte';
    import FeatureItem from 'flowbite-svelte-blocks/FeatureItem.svelte';
    import Faq from 'flowbite-svelte-blocks/Faq.svelte';
    import FaqItem from 'flowbite-svelte-blocks/FaqItem.svelte';

    import Footer from 'flowbite-svelte/Footer.svelte';
    import FooterBrand from 'flowbite-svelte/FooterBrand.svelte';
    import FooterLinkGroup from 'flowbite-svelte/FooterLinkGroup.svelte';
    import FooterLink from 'flowbite-svelte/FooterLink.svelte';
    import FooterCopyright from 'flowbite-svelte/FooterCopyright.svelte';

    import FolderOutline from 'flowbite-svelte-icons/FolderOutline.svelte';
    import VideoCameraOutline from 'flowbite-svelte-icons/VideoCameraOutline.svelte';
    import RectangleListOutline from 'flowbite-svelte-icons/RectangleListOutline.svelte';
    import ArrowRightOutline from 'flowbite-svelte-icons/ArrowRightOutline.svelte';
    import Button from 'flowbite-svelte/Button.svelte';
</script>

<Section name="heroVisual">
    <div class="mr-auto place-self-center lg:col-span-7">
        <HeroHeader
                h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
                pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {#snippet h1()}
                Streamline Tasks, Amplify Teamwork
            {/snippet}
            {#snippet paragraph()}
                Srello brings all your tasks, teammates, and tools together
            {/snippet}
            <a href="/register">
                <Button class="inline-flex items-center justify-center mr-3" color="red" size="xl">Get started
                    <ArrowRightOutline class="ml-2 -mr-1" size="md"/>
                </Button>
            </a>
        </HeroHeader>
    </div>
    <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img alt="Application UI mockup" src="/SrelloUIMockupLanding3.webp"/>
    </div>
</Section>

<Section name="feature" sectionClass="bg-gray-50 dark:bg-gray-800">
    <HeroHeader class="max-w-screen-md mb-8 lg:mb-16"
                h2Class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
                pClass="text-gray-500 sm:text-xl dark:text-gray-400">
        {#snippet h2()}
            Key Features of Our Project Management Solutions
        {/snippet}
        {#snippet paragraph()}
            Project Management Made Simple.
        {/snippet}
    </HeroHeader>
    <FeatureDefault>
        <FeatureItem>
            {#snippet icon()}
                <FolderOutline class="text-primary-600 dark:text-primary-300"/>
            {/snippet}
            {#snippet h3()}
                Project management
            {/snippet}
            {#snippet paragraph()}
                Keep tasks in order, deadlines on track, and team members aligned with Srello.
            {/snippet}
        </FeatureItem>
        <FeatureItem>
            {#snippet icon()}
                <VideoCameraOutline class="text-primary-600 dark:text-primary-300"/>
            {/snippet}
            {#snippet h3()}
                Meetings
            {/snippet}
            {#snippet paragraph()}
                Empower your team meetings to be more productive and more empowering.
            {/snippet}
        </FeatureItem>
        <FeatureItem>
            {#snippet icon()}
                <RectangleListOutline class="text-primary-600 dark:text-primary-300"/>
            {/snippet}
            {#snippet h3()}
                Task management
            {/snippet}
            {#snippet paragraph()}
                Use Srello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make
                your team’s projects a cohesive success every time.
            {/snippet}
        </FeatureItem>
    </FeatureDefault>
</Section>

<Section name="faq">
    <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked
        questions</h2>
    <Faq>
        <div>
            <FaqItem>
                {#snippet h3()}
                    What is Srello and how does it work?
                {/snippet}
                <p class="text-gray-500 dark:text-gray-400">Srello is a project management tool that uses boards, lists,
                    and cards to help you organize and prioritize your projects. You can create boards for different
                    projects, add lists to represent workflow stages, and use cards to track individual tasks.</p>
            </FaqItem>
            <FaqItem>
                {#snippet h3()}
                    How many people can I add to my board?
                {/snippet}
                <p class="text-gray-500 dark:text-gray-400">You can add unlimited team members to your boards.</p>
                <p class="text-gray-500 dark:text-gray-400">
                    Need more information? <a
                        class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                        href="/">Contact
                    our support team</a>.
                </p>
            </FaqItem>
        </div>
        <div>
            <FaqItem>
                {#snippet h3()}
                    How secure is my data on Srello?
                {/snippet}
                <p class="text-gray-500 dark:text-gray-400">We take security seriously. Srello uses industry-standard
                    encryption protocols to protect your data, and we regularly perform security audits to ensure your
                    information remains safe.</p>
            </FaqItem>
            <FaqItem>
                {#snippet h3()}
                    What makes Srello different from other project management tools?
                {/snippet}
                <p class="text-gray-500 dark:text-gray-400">Srello combines simplicity with powerful features, making it
                    perfect for both small teams and large organizations. Our focus on user experience and seamless
                    collaboration sets us apart from other tools.</p>
                <p class="text-gray-500 dark:text-gray-400">
                    Learn more about our features in our <a
                        class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                        href="/">documentation</a>.
                </p>
            </FaqItem>
        </div>
    </Faq>
</Section>

<Footer footerType="socialmedia">
    <div class="grid gap-12 lg:grid-cols-5 lg:gap-24">
        <div class="col-span-2">
            <FooterBrand aClass="flex mb-6" alt="Srello Logo" href="https://area.cbyte.be" name="Srello"
                         src="/srello.svg"/>
            <p class="text-gray-600 dark:text-gray-400">Srello is agile planning application for developers</p>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Resources</h2>
            <FooterLinkGroup>
                <FooterLink href="https://kit.svelte.dev" liClass="mb-4">SvelteKit</FooterLink>
                <FooterLink href="https://flowbite-svelte.com" liClass="mb-4">Flowbite-Svelte</FooterLink>
            </FooterLinkGroup>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">help & support</h2>
            <FooterLinkGroup>
                <FooterLink href="mailto:quentin.filliaert@proton.me" liClass="mb-4">Mail</FooterLink>
                <FooterLink href="https://github.com/PasVegan" liClass="mb-4">GitHub</FooterLink>
            </FooterLinkGroup>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Follow me</h2>
            <FooterLinkGroup>
                <FooterLink href="https://www.linkedin.com/in/quentin-filliaert" liClass="mb-4">LinkedIn</FooterLink>
                <FooterLink href="https://github.com/PasVegans" liClass="mb-4">GitHub</FooterLink>
            </FooterLinkGroup>
        </div>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
    <div class="sm:flex sm:items-center sm:justify-between">
        <FooterCopyright by="Srello™" href="/landing"/>
    </div>
</Footer>
