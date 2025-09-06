import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  Gamepad2,
  Play,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-primary/20 rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <span>Join 10,000+ players</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 rating</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            The Ultimate <span className="text-primary">Multiplayer</span>{" "}
            Gaming Experience
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stop playing alone. Join thousands of players in{" "}
            <span className="font-semibold text-foreground">
              real-time multiplayer games
            </span>{" "}
            where every second counts and every move matters.
          </p>

          {/* Urgency CTA */}
          <Card className="max-w-2xl mx-auto border-2 border-foreground shadow-lg rounded-none">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center space-x-2 text-primary">
                <Clock className="h-5 w-5" />
                <span>Limited Time: Free Premium Access</span>
              </CardTitle>
              <CardDescription>
                Get instant access to all games and features. No credit card
                required.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-4 justify-center">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 rounded-none shadow-lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Playing Now
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/play">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 rounded-none border-2 hover:border-foreground"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Watch Live Games
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground pt-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Tournaments Daily</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Instant Matchmaking</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Global Community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Join the Gaming Revolution</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border-2 border-foreground shadow-lg rounded-none p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                10,000+
              </div>
              <div className="text-muted-foreground">Active Players</div>
            </div>
            <div className="bg-card border-2 border-foreground shadow-lg rounded-none p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Games Available</div>
            </div>
            <div className="bg-card border-2 border-foreground shadow-lg rounded-none p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Always Active</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Why Players Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience gaming like never before with cutting-edge technology
              and a thriving community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-primary/10 border-2 border-foreground shadow-lg rounded-none flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Sub-50ms latency ensures your moves are instant. No lag, no
                excuses, just pure gaming.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-primary/10 border-2 border-foreground shadow-lg rounded-none flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Always Connected</h3>
              <p className="text-muted-foreground">
                Join thousands of players worldwide. Find matches instantly, any
                time of day.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 bg-primary/10 border-2 border-foreground shadow-lg rounded-none flex items-center justify-center mx-auto">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Compete & Win</h3>
              <p className="text-muted-foreground">
                Daily tournaments, leaderboards, and exclusive rewards for top
                players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto border-2 border-foreground shadow-xl rounded-none">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-4xl font-bold">
              Ready to Dominate?
            </CardTitle>
            <CardDescription className="text-xl max-w-2xl mx-auto">
              Join the elite gaming community. Create your account in 30 seconds
              and start playing immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/login">
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 rounded-none shadow-lg"
                >
                  <Gamepad2 className="h-6 w-6 mr-2" />
                  Create Free Account
                  <ArrowRight className="h-6 w-6 ml-2" />
                </Button>
              </Link>
              <Link href="/play">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 rounded-none border-2 hover:border-foreground"
                >
                  <Users className="h-6 w-6 mr-2" />
                  Browse Live Games
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              No credit card required • Free forever • Join 10,000+ players
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
