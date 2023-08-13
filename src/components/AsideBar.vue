<template>
    <div class="forms">
        <aside>
            <div class="asidebar__logo">
                <RouterLink to="">TiptapText</RouterLink>
            </div>
            <div class="asidebar__btn">
                <ul>
                    <li>
                        <RouterLink to="">Mes notes</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="">Utilisateurs</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="">Archive</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="">Corbeille</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="">Calendrier</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="asidebar__date">
                <p>23/06/2023</p>
                <p>14:00:00</p>
            </div>
        </aside>
        <div class="navbar">
            <header>
                <div class="container">
                    <div>

                    </div>
                    <div>
                        <div>
                            <input type="text">
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </header>
        </div>
    </div>
</template>
<script lang="ts">

</script>
<style scoped>
.forms{
    display: flex;
}
aside{
    background-color: rgb(37, 37, 37);
    width: 250px;
    height: 100vh;
    padding: 40px 20px; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.asidebar__logo{
    font-size: 1.6rem;
    font-weight: bold;
}

.asidebar__logo a{
    color: rgb(2, 129, 47);
}

.asidebar__btn ul{
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;
}

.asidebar__btn ul li a{
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    padding: 10px 45px;
}

/* .asidebar__btn ul li a:hover{
    background-color: rgba(0, 0, 0, 0.892);
    width: 100%;
} */

.asidebar__date{
    display:flex;
    gap:10px;
    justify-content: center;
}

.asidebar__date p{
    color: white;
}

header{
    background-color: rgb(255, 0, 0);
    width: calc(100% - 250px);
}
</style>