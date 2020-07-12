import { Component, OnDestroy, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownOption } from '@brand/dropdown/dropdown-option';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Question, Round } from '../quiz.model';

import { RoundService } from '../round.service';
import { QuestionService } from '../question.service';
import { BrandExpansionComponent } from 'projects/brand/src/lib/expansion/expansion.component';

@Component({
    templateUrl: './lobby.component.html',
    styleUrls: [ './lobby.component.scss' ],
    providers: [
        RoundService,
        QuestionService
    ]
})
export class LobbyComponent implements OnInit, OnDestroy {

    public rounds: Array<Round> = [];
    public questions: Array<Question> = [];

    public roundForm: FormGroup;
    public questionForm: FormGroup;
    public availableRounds: Array<DropdownOption> = [];
    public availableTypes: Array<DropdownOption>;

    private isDestroyed = new Subject();

    @ViewChildren('expansions') expansionComponents: QueryList<BrandExpansionComponent>;

    constructor(
        private route: ActivatedRoute,
        private forms: FormBuilder,
        private roundService: RoundService,
        private questionService: QuestionService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.roundService
            .findAll(this.route.snapshot.params.gameId)
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((rounds) => {
                this.updateRoundDataKeepingExpandedPanels(rounds);
                this.availableRounds = this.rounds.map((round) => ({ id: round.uid, title: round.title }));
            });

        this.availableTypes = [
            { id: 'standard', title: 'Standard', caption: 'A simple text question' },
            { id: 'image', title: 'Picture', caption: 'Images are great for doing a picture round' },
        ];

        this.roundForm = this.forms.group({
            title: [ undefined, [ Validators.required, Validators.maxLength(24) ] ],
            description: [ undefined, [ Validators.maxLength(240) ] ],
        });

        this.questionForm = this.forms.group({
            round: [ undefined, [ Validators.required ] ],
            type: [ this.availableTypes[ 0 ], [ Validators.required ] ],
            text: [ undefined, [ Validators.required, Validators.maxLength(500) ] ],
            choices: this.forms.array([]),
        }, { validator: this.checkQuestion });

        for (const i of new Array(4)) {
            this.addOption();
        }
    }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    private updateRoundDataKeepingExpandedPanels(rounds): void {
        let expandedList: boolean[] = this.expansionComponents.map(c => !c.collapsed);
        this.rounds = [ ...rounds ];
        if (this.expansionComponents.length != expandedList.length) return;
        let iExpanded = 0;
        this.changeDetectorRef.detectChanges();
        this.expansionComponents.forEach(comp => {
            if (expandedList[ iExpanded++ ])
                comp.toggle();
        });
    }

    get formOptions(): FormArray {
        return <FormArray> this.questionForm.get('choices');
    }

    public addOption(): void {
        if (this.formOptions.length < 8) {
            this.formOptions.push(this.createOption());
        }
    }

    public removeOption(index: number): void {
        if (this.formOptions.length > 1) {
            this.formOptions.removeAt(index);
        }
    }

    public createOption(): FormGroup {
        return this.forms.group({
            text: [ undefined, [ Validators.required ] ],
            correct: [ { value: false, disabled: false }, [] ],
        });
    }

    private checkQuestion(control: AbstractControl) {
        const choices = control.get('choices').value;
        const valid = choices.reduce((isValid, choice) => isValid || choice.correct, false);
        if (!valid) {
            control.get('choices').setErrors({ answer: true });
        }
    }

    public saveRound(): void {
        const gameId = this.route.snapshot.params.gameId;
        const round = this.roundForm.getRawValue();

        this.roundService
            .create(gameId, round.title, round.description)
            .subscribe(
                () => this.roundForm.reset(),
            );
    }

    public saveQuestion(): void {
        const gameId = this.route.snapshot.params.gameId;
        const question = this.questionForm.getRawValue();
        const roundId = question.round.id;

        this.questionService
            .create(gameId, roundId, question.text, question.type.id, question.choices)
            .subscribe(
                (questionUid) => {
                    this.questionForm.reset({ type: question.type, round: question.round });
                    this.loadQuestions(this.rounds.find(r => r.uid = roundId));
                }
            );
    }

    public roundQuestionsToogle(round: Round, collapsing: any) {
        if (!collapsing) {//if its geting collapsed we dont need new details.
            this.loadQuestions(round);
        }
    }

    public loadQuestions(round: Round): void {
        const gameId = this.route.snapshot.params.gameId;
        this.questionService.findAll(gameId, round.uid)
            .pipe(
                take(1),
            )
            .subscribe((questions) => round.questions = questions);
    }

}
