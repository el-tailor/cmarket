<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index(): Response
    {
        return $this->render('main/index.html.twig');
    }

    #[Route('/signin', name: 'app_signin')]
    public function signin(): Response {
        return $this->render("sign/signin.html.twig");
    }

    #[Route('/signup', name: 'app_signup')]
    public function signup(): Response {
        return $this->render("sign/signup.html.twig");
    }
}
