<script lang="ts">
    import type { ActionData } from "./$types";

    export let data: any;

    export let form: ActionData;
</script>

<svelte:head>
    <title>Select Company</title>
</svelte:head>

<div class="container vh-100 d-flex align-items-center justify-content-center">
    <div
        class="container border rounded py-3 shadow-sm"
        style="max-width: 576px;"
    >
        <h2>Select your company</h2>
        <form method="POST" class="container d-flex flex-column mt-4">
            <select name="company" id="company">
                {#each data.companies as company}
                    <option value={company.id}>{company.name}</option>
                {/each}
            </select>

            <div class="row d-flex justify-content-center mt-4">
                <div class="col-10 col-sm-6">
                    <input
                        type="submit"
                        value="Continue"
                        formaction="?/continueAdmin"
                        class="btn btn-primary w-100"
                    />
                </div>
                <div class="col-10 col-sm-6">
                    <input
                        type="submit"
                        value="New"
                        formaction="?/newCompany"
                        class="btn btn-secondary w-100"
                    />
                </div>
            </div>
            {#if form?.missing}
                <div class="alert alert-danger mt-3">
                    Select a company to continue
                </div>
            {/if}
        </form>
    </div>
</div>
