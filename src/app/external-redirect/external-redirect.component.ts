import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-external-redirect',
  template: '<p>Redirecting...</p>',
})
export class ExternalRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const mapUrl = params['mapUrl'];
      window.location.href = mapUrl;
    });
  }
}
